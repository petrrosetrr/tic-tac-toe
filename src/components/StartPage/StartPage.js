import React, {useState} from 'react';
import {Link} from "react-router-dom";
import s from './StartPage.module.css';

const StartPage = () => {
    const [value, setValue] = useState('3');

    return (
        <section className={s.StartPage}>
            <h1 className={s.title}>Tic-tac-toe</h1>
            <label className={s.fieldSize}>
                Choose filed size between 3 - 12:
                <input
                    type="number"
                    min={3}
                    max={12}
                    value={value}
                    onChange={(e)=> {
                        setValue(e.target.value);
                    }}
                />
            </label>
            <Link
                className={s.startBtn}
                to={{
                    pathname: 'game',
                    hash: `${value}`,
                }}
            >
                <svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.8123 22.0464C2.55585 22.0465 2.30188 21.996 2.06493 21.8979C1.82797 21.7998 1.61266 21.656 1.43131 21.4747C1.24995 21.2933 1.10609 21.078 1.00796 20.8411C0.909826 20.6042 0.859337 20.3502 0.859375 20.0937V2.9082C0.859375 2.56121 0.951815 2.22049 1.12718 1.92108C1.30255 1.62167 1.55452 1.37439 1.85717 1.20467C2.15981 1.03495 2.50221 0.948914 2.84913 0.955422C3.19606 0.96193 3.53499 1.06074 3.83105 1.2417L17.8912 9.83437C18.1767 10.0088 18.4125 10.2537 18.5762 10.5455C18.7398 10.8374 18.8258 11.1663 18.8258 11.5009C18.8258 11.8354 18.7398 12.1644 18.5762 12.4562C18.4125 12.748 18.1767 12.9929 17.8912 13.1674L3.83105 21.7603C3.52427 21.9476 3.17175 22.0466 2.8123 22.0464V22.0464ZM3.20312 3.60488V19.3971L16.1236 11.501L3.20312 3.60488Z" fill="black"/>
                </svg>
                Start
            </Link>
        </section>

    );
};

export default StartPage;
