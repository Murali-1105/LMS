import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Wishlist() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const cardData = [
        {
            id: 1,
            imgSrc: '/public/Login-page.jpg',
            title: 'Card Title 1',
            text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            link: '#'
        },
        {
            id: 2,
            imgSrc: '/public/Login-page.jpg',
            title: 'Card Title 2',
            text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            link: '#'
        }, 
        {
            id: 3,
            imgSrc: '/public/Login-page.jpg',
            title: 'Card Title 1',
            text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            link: '#'
        },
        {
            id: 4,
            imgSrc: '/public/Login-page.jpg',
            title: 'Card Title 2',
            text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            link: '#'
        }, 
        {
            id: 5,
            imgSrc: '/public/Login-page.jpg',
            title: 'Card Title 1',
            text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            link: '#'
        },
        {
            id: 6,
            imgSrc: '/public/Login-page.jpg',
            title: 'Card Title 2',
            text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            link: '#'
        }, 
        {
            id: 7,
            imgSrc: '/public/Login-page.jpg',
            title: 'Card Title 1',
            text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            link: '#'
        },
        {
            id: 8,
            imgSrc: '/public/Login-page.jpg',
            title: 'Card Title 2',
            text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
            link: '#'
        },
    ];

    return (
        <section className='px-2 px-lg-5 py-2'>
            <div className='container-fluid'>
                <h4 className="my-4 text-center"><i className="bi bi-book-half"></i> My Subjects </h4>
                <div className='row'>
                    {cardData.map(card => (
                        <div key={card.id} className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4">
                            {isLoading ? (
                                <div className="card" aria-hidden="true"> 
                                    <div className='card-img-top p-5 text-center' alt="Card placeholder" ><i className="fas fa-spinner fa-spin"></i></div>
                                    <div className="card-body">
                                        <h5 className="card-title placeholder-glow">
                                            <span className="placeholder col-6"></span>
                                        </h5>
                                        <p className="card-text placeholder-glow">
                                            <span className="placeholder col-7"></span>
                                            <span className="placeholder col-4"></span>
                                            <span className="placeholder col-4"></span>
                                            <span className="placeholder col-6"></span>
                                            <span className="placeholder col-8"></span>
                                        </p>
                                        <button className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></button>
                                    </div>
                                </div>
                            ) : (
                                <div className="card">
                                    <img src={card.imgSrc} className="card-img-top" alt="Card" />
                                    <div className="card-body">
                                        <h5 className="card-title">{card.title}</h5>
                                        <p className="card-text">{card.text}</p>
                                        <Link to={card.link} className="btn btn-primary btn-sm w-100">Go somewhere</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Wishlist;
