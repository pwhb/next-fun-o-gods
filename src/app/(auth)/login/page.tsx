'use client';

import AuthWrapper from "@/components/auth/AuthWrapper";
import { loginUser } from "@/lib/actions/auth";

import PlaceholderKeys from "@/lib/consts/placeholder";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function Page()
{
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [state, formAction] = useFormState(loginUser, undefined);
    const { pending } = useFormStatus();
    return (<AuthWrapper>
        <form action={formAction}>
            <p className="text-center my-3 font-semibold text-primary text-2xl">Log in</p>
            <label className="label" htmlFor="username">
                <span className="label-text">Username</span>
            </label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder={PlaceholderKeys.username}
                className={`input input-bordered ${state?.username.error ? 'input-error' : ''}`}
            />
            {state?.username.error && <p className="text-error my-2">{state?.username.error}</p>}



            <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
            </label>
            <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder=""
                className={`input input-bordered ${state?.password.error ? 'input-error' : ''}`}
            />
            {state?.password.error && <p className="text-error my-2">{state?.password.error}</p>}



            < div className="form-control">
                <label className="cursor-pointer label">
                    <span className="label-text">Show Password</span>
                    <input type="checkbox" onChange={(e) => setIsPasswordVisible(e.target.checked)} className="checkbox checkbox-secondary" checked={isPasswordVisible} />
                </label>
            </div>
            <div className="card-body p-0 items-center text-center my-4">
                <a href="/auth/register" id="login-link" className="label-text-alt link link-hover"
                >Don't have an account? Create one!</a
                >
            </div>
            <div className="form-control mt-6">

                <button className="btn btn-primary" type="submit" disabled={pending} aria-disabled={pending}>Log in</button>
            </div>
        </form >
    </AuthWrapper >);
}