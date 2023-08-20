import React from 'react';
import {useSelector} from 'react-redux';

function Navber() {
    const amount = useSelector(state => state.amount);
    const count = useSelector(state => state.count);
   

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-warning" style={{ "widht": '1363px' }}>
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Ecommerce</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/about">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/product">Product</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/services">Services</a>
                            </li>
                        </ul>
                        <button type="button" class="btn btn-dark mx-2">Balance: {amount}</button>
                        <button type="button" class="btn btn-danger rounded-pill position-relative">
                            Add To Card
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {count}
                                <span class="visually-hidden">unread messages</span>
                            </span>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navber;
