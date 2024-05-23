import { ReactNode } from "react";

export default function Application({
    children,
    top,
    bottom
}: {
    children: React.ReactNode,
    top?: ReactNode,
    bottom?: ReactNode
}) {
    return (
        <div className='app'>
            {
                top ?
                    <div className="top" >
                        {top}
                    </div>
                    :
                    undefined
            }
            {
                top || bottom ?
                    <div className='body'>
                        {children}
                    </div> :
                    children
            }
            {
                bottom ?
                    <div className='bottom'>
                        {bottom}
                    </div>
                    :
                    undefined
            }

        </div>
    );
}