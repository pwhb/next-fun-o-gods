export default function AuthWrapper({ children }: { children: React.ReactNode; })
{
    return <div className="hero min-h-screen bg-base-200">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
                {children}
            </div>
        </div>
    </div>;

}