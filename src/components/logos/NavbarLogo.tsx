import React from 'react';
import NavbarLight from '../../assets/logos/NavbarLightFill.svg';
import '../../scss/main.scss';

function NavbarLogo() {
    //return <object data={NavbarLight} type="image/svg+xml" width={400} />;
    return (
        <img
            src={NavbarLight}
            alt="DinnerMachine"
            width={300}
            style={{ fontFamily: 'Lets-Coffee' }}
        />
    );
}

export default NavbarLogo;
