import React from 'react';

const Footer = () => {
    return (
        <div>
            <div className="surface-0 mb-5 px-5">
                <div className="grid">
                    <div className="col-12 md:col-6 mb-4 px-5">
                        <li className="flex gap-4">
                            <i className="pi pi-qrcode text-blue-500" style={{ fontSize: '1.25rem'}}></i>
                            <div className="text-900 font-medium text-xl mb-3">Informatin Platform</div>
                        </li>
                        <hr className="my-2 mx-6  border-top-1 border-bottom-none border-300" />
                        <span className="text-700 line-height-3">The system was installed and deployed by a team consisting of members: Le Xuan Tien, Tran Minh Tri and Luong Van Trieu. The system offers the most famous and best courses on the market today. Associated with many companies all over the world.</span>
                        <br></br>
                        <br></br>
                        <li className="flex align-items-center gap-3">
                            <div className="text-900 text-xl font-medium">Follow Us</div>
                        </li>
                        <br></br>
                        <li className="flex align-items-center gap-5">
                            <i className="pi pi-facebook text-blue-500" style={{ fontSize: '2rem'}}></i>
                            <i className="pi pi-twitter text-blue-500" style={{ fontSize: '2rem'}}></i>
                            <i className="pi pi-linkedin text-blue-500" style={{ fontSize: '2rem'}}></i>
                            <i className="pi pi-telegram text-blue-500" style={{ fontSize: '2rem'}}></i>
                        </li>


                    </div>
                    <div className="col-12 md:col-3 mb-4 px-5">
                        <div className="text-900 font-medium text-xl mb-3">Our Links</div>
                        <hr className="my-2 mx-6  border-top-1 border-bottom-none border-300" />
                        <li className="flex align-items-center gap-3">
                            <i className="pi pi-play text-green-500" style={{ fontSize: '1.25rem'}}></i>
                            <div className="text-700">Web Fullstack Developer</div>
                        </li>
                        <br></br>
                        <li className="flex align-items-center gap-3">
                            <i className="pi pi-play text-green-500" style={{ fontSize: '1.25rem' }}></i>
                            <div className="text-700">Graphics</div>
                        </li>
                        <br></br>
                        <li className="flex align-items-center gap-3">
                            <i className="pi pi-play text-green-500" style={{ fontSize: '1.25rem' }}></i>
                            <div className="text-700 ">Photography</div>
                        </li>
                        <br></br>
                        <li className="flex align-items-center gap-3">
                            <i className="pi pi-play text-green-500" style={{ fontSize: '1.25rem' }}></i>
                            <div className="text-700">Health & Fitness</div>
                        </li>
                        <br></br>
                        <li className="flex align-items-center gap-3">
                            <i className="pi pi-play text-green-500" style={{ fontSize: '1.25rem' }}></i>
                            <div className="text-700">UI/UX Design</div>
                        </li>

                    </div>
                    <div className="col-12 md:col-3 mb-4 ">
                        <div className="text-900 font-medium text-xl mb-3">Get In Touch</div>
                        <hr className="my-2 mx-6  border-top-1 border-bottom-none border-300" />
                        <li className="flex gap-3">
                            <i className="pi pi-home text-blue-500" style={{ fontSize: '1.25rem'}}></i>
                            <div className="text-700">KTX Khu B, Dong Hoa Ward, Di An Town, Binh Duong Province</div>
                        </li>
                        <br></br>
                        <li className="flex align-items-center gap-3">
                            <i className="pi pi-google text-blue-500" style={{ fontSize: '1.25rem'}}></i>
                            <div className="text-700">Luongtrieu1234a@gmail.com</div>
                        </li>
                        <br></br>
                        <li className="flex align-items-center gap-3">
                            <i className="pi pi-phone text-blue-500" style={{ fontSize: '1.25rem'}}></i>
                            <div className="text-700">+84 78733820</div>
                        </li>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Footer;