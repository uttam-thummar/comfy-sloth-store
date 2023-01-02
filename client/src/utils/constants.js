import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi';
export const links = [
    {
        id: 1,
        text: 'Home',
        url: '/'
    },
    {
        id: 2,
        text: 'About',
        url: '/about'
    },
    {
        id: 3,
        text: 'Products',
        url: '/products'
    }
];

export const services = [
    {
        id: 1,
        icon: <GiCompass />,
        title: 'mission',
        text:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum saepe sequi in ex accusamus rerum quod fuga itaque expedita quidem!',
    },
    {
        id: 2,
        icon: <GiDiamondHard />,
        title: 'vision',
        text:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse ratione iusto ducimus et, id deleniti illo molestiae quia harum sapiente.',
    },
    {
        id: 3,
        icon: <GiStabbedNote />,
        title: 'history',
        text:
            'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti, rerum. Earum, delectus? Fugit recusandae tenetur sed laboriosam aliquid, quidem deserunt.',
    },
];

export const products_url = 'https://course-api.com/react-store-products';
export const single_product_url = `https://course-api.com/react-store-single-product?id=`