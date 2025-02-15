import { useRouteError } from "react-router-dom";
import {useEffect} from "react";
import './styles/main.scss'
import './styles/error.scss'

export default function ErrorPage() {
    const error = useRouteError();
    useEffect(() => {
        document.title = '오류가 발생했습니다.'
    }, [])

    return (
        <div className="container">
            <h1>오류가 발생했습니다.</h1>
            <br />
            <p>
                {error.statusText || error.message}
            </p>
        </div>
    );
}
