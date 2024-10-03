import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { io, Socket } from 'socket.io-client';

interface Props {
    currUser: string
}

interface Leaderboard {
    userName: string,
    score: string,
    lastCorrectAnswer: number,
}

const SOCKET_SERVER_URL = "https://math-quiz-real-time.onrender.com/"; 

export const Home: React.FC<Props> = ({currUser}) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [message, setMessage] = useState("");
    const [winner, setWinner] = useState("");

    const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);

    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        socketRef.current = io(SOCKET_SERVER_URL, {
            query: { username: currUser },
            transports: ['websocket'],
            withCredentials: true,
        });
        socketRef.current.on("new-question", (data) => {
            setAnswer("");
            setQuestion(data["question"]);
        });

        socketRef.current.on("winner", (data: {winner: string}) => {
            setWinner(data.winner);
        })

        socketRef.current.on("leaderboard", (data: {leaderboardData: Leaderboard}) => {
            if(Array.isArray(data.leaderboardData)) { 
                console.log(data.leaderboardData);
                setLeaderboard(data.leaderboardData);
            }
        })

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);

    const handleSubmit = () => {
        if (socketRef.current) {
            socketRef.current.emit("submit-answer", {currUser, answer }, (response: {success: boolean, message: string}) => {
                if(!response.success)
                    setMessage(response.message)
                    setTimeout(()=>{
                        setMessage("")
                    },2000)
            });
        } else {
            console.error("Socket is not initialized");
        }
    };


    return (
        <div className="max-w-2xl flex flex-col h-screen items-center justify-center mx-auto p-4 relative">
        <div className='w-full text-xl flex items-center justify-between'>
            <div className="my-4 text-center font-semibold">Username: {currUser}</div>
            {winner ? <div className="my-4 text-center text-green-600 font-semibold">{winner} won!</div> : ""}
        </div>
        <div className=" w-full mb-2 text-left text-xs text-indigo-700 font-semibold">For percentage round off to the nearest whole number.</div>
        <Card className="mb-4 w-full">
            <CardHeader className="text-2xl font-bold text-center">
                Math Quiz Challenge
            </CardHeader>
            <CardContent>
                <div className="text-xl mb-4 text-center">{question}</div>
                <div className="flex gap-2">
                    <Input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Enter your answer"
                    className="flex-grow"
                    />
                    <Button onClick={handleSubmit}>Submit</Button>
                </div>
                {message && (
                    <div className="mt-2 text-center font-semibold">{message}</div>
                )}
            </CardContent>
        </Card>
        <Card className='w-full'>
            <CardHeader className="font-bold">Leaderboard</CardHeader>
            <CardContent>
            <div className="space-y-2">
                {leaderboard.map((user, index) => (
                <div key={index} className="flex justify-between">
                    <span>{user.userName}</span>
                    <span>{user.score} points</span>
                </div>
                ))}
            </div>
            </CardContent>
        </Card>
        </div>
    );
    };
