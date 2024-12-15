import { cn } from "../../lib/class-merger";
import { Routes } from "../../lib/routes"
import { Header } from "../nav/Header"

interface IDefaultLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export const DefaultLayout = ({ children, className }: IDefaultLayoutProps) => {
    return (
        <div className="h-screen w-screen bg-slate-900 px-40">
            <Header routes={Routes} />
            <main className={cn("my-20", className)}>{children}</main>
        </div>
    )
}
