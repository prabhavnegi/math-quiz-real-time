import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const UserName: React.FC<{handleCurrUser: (username: string)=> void}> = ({handleCurrUser}) => {
    const [userName, setUserName] = useState("");

    const handleSubmit = (e: React.SyntheticEvent<any, Event>) => {
        e.preventDefault()
        localStorage.setItem("username", JSON.stringify(userName))
        handleCurrUser(userName)
    }

    return (
        <div className="max-w-2xl flex flex-col h-screen items-center justify-center mx-auto p-4">
        <Card className="mb-4 w-full">
            <CardHeader className="text-2xl font-bold text-center">
                Enter your username
            </CardHeader>
            <CardContent>
                <div className="flex gap-2">
                    <Input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your answer"
                    className="flex-grow"
                    />
                    <Button onClick={handleSubmit}>Submit</Button>
                </div>
            </CardContent>
        </Card>
        </div>
    );
    };
