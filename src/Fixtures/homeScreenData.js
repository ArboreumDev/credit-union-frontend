class HomeScreenData {

    constructor() {
        this.data = {
            "introSection": {
                "title": "Quick and easy money solutions no buts, no ifs.",
                "desc": "Finance is complex enough. People and businesses deserve easy, straightforward products that actually work. Arboreum makes it super easy for anyone to borrow, invest and make payments. No excuses.",
                "storeLink" : {
                    "android" : "https://play.google.com/store/apps/details?id=com.aella.comportal",
                    "ios": "https://apps.apple.com/ng/app/aella-app/id1498675625"
                },
                "video" : "https://static.aellacredit.com/assets/website_loop.mp4",
                "image" : ""
            },
            "listSection": [
                {
                    "id" : 1,
                    "item" : "Loans",
                    "title" : "Arboreum Credit",
                    "desc" : "Get simple and easy access to funds. We all need to take a little credit for our hard work sometimes.",
                    "link" : "https://aellaapp.com/aella-credit",
                    "image" : "https://aellaapp.com/static/media/wallet.c599b8a4.svg"
                },
                {
                    "id" : 2,
                    "item" : "Investments",
                    "title" : "Arboreum Notes",
                    "desc" : "Invest the smart way on Arboreum Notes. Get access to our loan book and see exactly how your investment is used and your accrued interest.",
                    "link" : "https://aellaapp.com/investment",
                    "image" : "https://aellaapp.com/static/media/flower.460efe6c.svg"
                },
                {
                    "id" : 3,
                    "item" : "Payments",
                    "title" : "Payments",
                    "desc" : "Bill payments made easy. Pay for anything, anytime, anywhere via the Arboreum app.",
                    "link" : "",
                    "image" : "https://aellaapp.com/static/media/phone.ef25bb28.svg"
                },
                {
                    "id" : 4,
                    "item" : "Insurance",
                    "title" : "Arboreum Care",
                    "desc" : "You deserve more out of life for less. Get covered. Get affordable insurance plans via Arboreum.",
                    "link" : "https://aellaapp.com/insurance",
                    "image" : "https://aellaapp.com/static/media/aellaCare.93e61a5e.svg"
                }
            ],
            "mainSection": [
                {
                    "id" : 1,
                    "title" : "Your one-stop app for all your financial needs",
                    "desc" : "Arboreum takes the hassle out of Finance - whether you are a business or an individual, we put control back in your hands with simple, straightforward products. Our \"true north\" is designed to help customers build financial independence by building simple products; loans, investments, bill payments, micro-insurance plans, and peer-to-peer money transfers.",
                    "image" : "https://aellaapp.com/static/media/phone.3535895e.svg"
                },
                {
                    "id" : 2,
                    "title" : "Our 5 mins is 5 mins",
                    "desc" : "Instant loans shouldn't be a luxury, Arboreum has credit solutions for the everyday person –– Whether you are a business, or an individual, we are determined to make credit work for you. No excuses. You are killing it, all you need is sufficient funds and we have got it.",
                    "image" : "https://aellaapp.com/static/media/person.25b5dad5.png"
                },
                {
                    "id" : 3,
                    "title" : "Why Arboreum?",
                    "desc" : "We exist to simplify and open up financial access for all in emerging markets - by leveraging technology and widespread mobile adoption, we build products to make an impact at the frontier of Financial Inclusion.",
                    "image" : "https://aellaapp.com/static/media/people.19b8da9b.png"
                }
            ]
        };

        this.getHomeScreenData = this.getHomeScreenData.bind(this);
    }

    getHomeScreenData() {
        return this.data;
    }
}

const homeScreenData = new HomeScreenData();
export default homeScreenData;
