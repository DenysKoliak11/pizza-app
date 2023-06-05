import React from "react";
import CartEmptyImg from '../assets/img/empty-cart.png'
import { Link } from "react-router-dom";



const NotFoundBlock = () => {
    return (
        <div className="cart cart--empty">
            <h2>
                Кошик порожній
                <span>😎</span>

            </h2>
            <p>
                Ви ще не замовили піцу
                <br />
                Для того, щоб замовити піцу, перейдіть на головну сторінку
            </p>
            <img src={CartEmptyImg} alt="Cart-Empty" />
            <Link to="/" className="button button--black">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>

                <span>Повернутися назад</span>
            </Link>
        </div>
    );
};
export default NotFoundBlock;