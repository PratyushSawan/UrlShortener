// module.exports = (link) =>  link + 'pratyus

module.exports =(link) => {

    const amazon = link.indexOf("www.amazon");
    const amzonTag = '?&tag=pratyushsawan-21'; // affliated amazon code
    const fkartTag = '?&affid=techintech';
    // let fkart = link.indexOf("www.flipkart");

    //Logic For Findig Amazon Link
    if (amazon != -1) {
        let amznLinkcheck = link.indexOf('?&tag');
        let amznLinkcheck2 = link.indexOf('&tag');
        let amznLinkcheck3 = link.indexOf('?tag');

        //This can help to chnage any other referal link to own refral link
        if (amznLinkcheck != -1) {
            link = link.substring(0, amznLinkcheck);
             
            return link;
        }
        else if (amznLinkcheck2 != -1) {
            link = link.substring(0, amznLinkcheck2);

            return link;
        }
        else if (amznLinkcheck3 != -1) {
            link = link.substring(0, amznLinkcheck3);

            return link;

        }

        //This is for simple amzon product link
        else {
            return link + amzonTag;
        }

    }

    else {
        console.log('Enter a valid link')
    }
}
