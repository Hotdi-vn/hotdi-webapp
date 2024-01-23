import BottomNavBar from "./bottom-nav-bar/BottomNavBar";

export default function Application({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='app'>
            <div className='body'>
                {children}
            </div>
            <div className='bottom'>
                <BottomNavBar />
            </div>
        </div>
    );
}