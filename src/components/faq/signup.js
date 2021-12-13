
const whyAlgoAnswer = `
Other than traditional platforms/websites, blockchain-enabled platforms don't
manage your identity for you. This has upsites & downsites: 

On the plus side: The funds & everything associated is really really yours. Even
if we were hacked or under pressure from a government, your funds & activity
would remain the same.

On the flipside: If you loose the passphrase that secures your account, we can't
help you and all you funds will remain unretrievable. It's like becoming
spiderman: With more power comes more responsability. But don't worry too much,
we will help you make sure that you manage your passphrase correctly.

footnote: This concept (decentralization) is fundamentally different from how
the internet currently works and it has a lot of implications that are not
really obvious. If you're curious and want to understand more about why so many
people are really exited about it, here are some links to get you started: LINK-LINK
`

const whyDoINeedItAnswer = `
Other than traditional platforms/websites, blockchain-enabled platforms don't manage your identity for you. 
This has upsites & downsites:  
On the plus side: The funds & everything associated is really really yours. Even if we were hacked or under pressure from a government, your funds & activity would remain the same.  
On the flipside: If you loose the passphrase that secures your account, we can't help you and all you funds will remain unretrievable. 

It's like becoming spiderman: With more power comes more responsability. But don't worry too much, we will help you make sure that you manage your passphrase correctly. 

`
// footnote: This concept (decentralization) is fundamentally different from how the internet currently works and it has a lot of implications that are not really obvious. If you're curious and want to understand more about why so many people are really exited about it, here are some links to get you started: LINK-LINK.

const whyAlgoConnectAnswer = `
Its an external Wallet-Software Provider. 
It helps you create, store and manage Algorand-Accounts in a way that all sensitive information never leaves your computer
 (instead of being sent over the internet and stored on some server). 
AlgoConnect is developed by Randlabs, who   

TODO:  
   - is my data safe? 
   - do they earn money with it?
`

const foreverAlgoConnectAnswer =`
No. A really neat thing about blockchain identities is that you can take them with you very easily. We have chosen to use AlgoConnect now, but more, better or just other options will be available in the future.
`

const stillNotAnswer =`
Don't worry. While the underlying cryptocraphy is hard, using a wallet isquite simple if you're following a few principles. Just follow the steps to set up an account. The process is simple, takes less than 3 minutes, is free and explains what you need to know along the way.
`

const connectPasswordAnswer = `
This is a password that you will use to AUTHORIZE your transactions & actions that you do. Also, you will regularly use it to UNLOCK your wallet: As it has so much sensitive information, your wallet will quickly lock itself if you're not using it, so that nobody can steal your funds or act as you, even if you happen to leave your computer unattended.  You will also be able to change it later on, so if you just set up an account for trying things out, its okay to use something that you can type quickly.
NOTE: If you intend to manage actual serious funds, we recommend using a serious password too!
`

const addWalletAnswer = `
There are many ways to create an account or import one from another wallet management solution. If you're new and this is your first Algorand-Wallet, select the "New Wallet"-option.  If you already have a different Algorand-Wallet, you could export your seed-phrase from there and choose the "Import Phrase"-option to control the same account with AlgoConnect.
`

const whyDoINeedMemAnswer = `
An old saying goes: "On the internet nobody knows if you're dog." That's because on the internet, there is no real physical identity. There are just 0's and 1's that are being sent between computers. Nobody knows if the origins of a particular package of ones and zeros is you, another person claiming to be you, a different person, two persons, a bot or ... a dog. Blockchains and the internet solution to this problem are digital 'signatures'. Everything that comes from one entity needs to be signed by that entity. While in real life you only sign important things, on the internet you sign everything you do.  While the underlying math (cryptography) is complicated, the actual application is not. There is a process that maps a (secret) input to a certain output (signature). Whoever has that secret can sign stuff with it. Also, its really easy to check if something is signed and signature is legit. (Whereas in real life signing a bicycle or grain of salt would pose some practical problems).  Moreover, unlike real-life signatures, which can be forged, nobody can create things that could be mistaken for your signature. Unless of course, they know your secret. Then, for all intends & purposes they have become you and they have literally taken over your identity/money/profiles (and all your digital bicycles and digital spices).
`


const whatIsMemAnswer = `
This secret is a really really big number. So big, that it makes absolutely no sense trying to remember it and that there is no point in guessing it. So big, that if you could try a different number with every atom in the known universe, the chances that you would have guessed somebody else's secret number is still really really low. Isn't that cool?!  So instead, cryptographers came up with a neat way to represent this number with words: 25 words in a certain spelling and certain order to be exact. Those 25 words are generally called pass-phrase or mnemonic phrase and will be the 'secret' that you to sign all your stuff and prove that you want to do things.
`

const howManageMemAnswer = `
There are many ways to safeguard 25 words. There are a number of best-practices, ranging from simple to extremely paranoid. You must choose for yourself how paranoid you want to be, but generally assuring that a single unexpected event like a fire or a flood doesnt make you loose your secret is not too hard.  Here are some best practices and general warnings that AlgoConnect suggests  https://wallet.myalgo.com/tips-on-mnemonic-phrase.
`

const whatElseMemAnswer = `
Once you created the account, you will not use in practice. You will only ever use it if you want to initialize a new algoWallet instance on another computer, browser or in a different wallet-software.  It's not a log-in password and you shouldn't be using it as such. Also, nobody (except tricksters, fraudsters and scammers) will ever ask you to share it.  Remember, whoever has it, completely controls your account and funds. **So never, ever share it with anyone!**
`


export const questions = {
   q1: {
      question: "question1",
      title: "title1",
      answer: "answer1",
      tldr: "tldr1",
      position: 7,
      caption: "",
      imageSrc: "/images/algoConnectJourney/0.png",
      readMore: [
         {
            question: "followupquestion1",
            answer: "follup answer1",
            position: 0
         },
         {
            question: "followupquestion2",
            answer: "follup answer2",
            position: 1
         }
      ],
   },
   clarification: {
      title: "Wallet Setup",
      question: "Setting up an AlgoConnect Wallet",
      answer: "Instead of managing the keys & passwords that control your funds ourselves, we are using an external wallet software provider that has been battle tested, endorsed by the Algorand Blockchain Foundation and trusted by many other projects.",
      tldr: "In the following we will ask you to create an AlgoConnect Wallet. This is a digital wallet in which you can store assets & currencies from the Algorand Blockchain and that you will use to interact with our website.",
      position: 0,
      imageSrc: "/images/algoConnectJourney/0.png",
      caption: "This is the starting screen you will see when clicking the 'Setup AlgoConnect Wallet'-Button (or by going to https://wallet.myalgo.com/).",
      readMore: [
         {
            question: "Why do I need it?",
            answer: whyDoINeedItAnswer,
            position: 0
         },
         {
            question: "What/Who is AlgoConnect?",
            answer: whyAlgoConnectAnswer,
            position: 1
         },
         {
            question: "Will I forever be required to use AlgoConnect?",
            answer: foreverAlgoConnectAnswer,
            position: 2
         },
         {
            question: "What is it? I still don't understand...",
            answer: stillNotAnswer,
            position: 3
         }
      ],
   },
   passwordSetup: {
      title: "AlgoConnect Password",
      question: "Create an AlgoConnect-Account",
      answer: connectPasswordAnswer,
      tldr: "Create a (changeable) password for AlgoConnect",
      position: 1,
      imageSrc: "/images/algoConnectJourney/1.png",
      caption: "AlgoConnect password creation screen.",
      readMore: [ ],
   },
   walletCreation: {
      title: "Wallet Setup",
      question: "Create a new Wallet",
      answer: addWalletAnswer,
      tldr: "Out of different options, choose to create a new wallet based on a randomly generated secret.",
      position: 2,
      imageSrc: "/images/algoConnectJourney/2.png",
      caption: "There are many options to connect existing wallets to AlgoConnect or creating a new one at random",
      readMore: [ ],
   },
   mnemExplainer: {
      title: "Mnemonic Phrase Explainer",
      question: "The Mnemonic Phrase: Your identity on the blockchain",
      answer: "The mnemonic phrase is an easy way to back up a real big mathematical number that will be used to generate your account. You can just follow the steps to create the mnemonic phrase and learn as you go or dive deeper in our /readMore section below.",
      tldr: "You will create a random, unchangeable password that can be used to take over your account. Keep it really safe and never, ever share it!",
      position: 3,
      imageSrc: "/images/algoConnectJourney/3.png",
      caption: "This screen offers more info to understand what a mnemonic phrase is, how you should safeguard it and how it is different from a usual password.",
      readMore: [
         {
            question: "Why do I need this?",
            answer: whyDoINeedMemAnswer,
            position: 0
         },
         {
            question: "What it is AlgoConnect?",
            answer: whatIsMemAnswer,
            position: 1
         },
         {
            question: "How do I manage it?",
            answer: howManageMemAnswer,
            position: 2
         },
         {
            question: "So what else do I need to do with it?",
            answer: whatElseMemAnswer,
            position: 3
         }
      ],
   },
   mnemGen: {
      title: "Mnemonic Phrase Generation",
      question: "Create an absolutely unguessable secret!",
      answer: "answer1.",
      tldr: "todo",
      position: 4,
      imageSrc: "/images/algoConnectJourney/4.png",
      caption: "This screen shows something.",
      readMore: [],
   },
   mnemVerif: {
      title: "Mnemonic Phrase Verification",
      question: "Make sure you got your secret correctly backed up",
      answer: "answer1.",
      tldr: "todo",
      position: 5,
      imageSrc: "/images/algoConnectJourney/5.png",
      caption: "This screen shows something.",
      readMore: [],
   }


}

// position: "0",
//       answer: "In the following we will ask you to create an AlgoConnect Wallet. This is a digital wallet in which you can store assets & currencies from the Algorand Blockchain and that you will use to interact with our website.",
//       image: "",
//       readMore: [
//          {
//             question: "Why do I need it?",
//             answer: whyAlgoAnswer,
//             position: 0
//          },
//          {
//             question: "What is AlgoConnect?",
//             answer: `Its an external Wallet-Software Provider. It helps you create, store and manage
// Algorand-Accounts in a way that all sensitive information remains on your
// computer. 

// AlgoConnect is developed by Randlabs, who TODO
// do they earn money with it? is my data safe?`,
//             position: 1
//          },
//          {
//             question: "Will I forever be required to use AlgoConnect?",
//             answer: `No. A really neat thing about blockchain identities is that you can take them
// with you very easily. We have chosen to use AlgoConnect now, but more, better or
// just other options will be available in the future.`,
//             position: 2
//          },
//          {
//             question: "What is it? I still dont get it?",
//             answer: `Don't worry. While the underlying cryptocraphy is hard, using a wallet is
//     quite simple if you're following a few principles. Check those out HERE or
//     just follow the steps to set up an account. The process is simple (think less than 3 minutes), free and
//     explains what you need to know along the way.`,
//             position: 4
//          }
//       ]
//    },
// }
//    passwordSetup: {
//       question: "",
//       answer: `This is a password that you will use to AUTHORIZE your transactions & actions
// that you do. Also, you will regularly use it to UNLOCK your wallet: 
// As it has so much sensitive information, your wallet will quickly lock itself if you're not
// using it, so that nobody can steal your funds or act as you, even if you happen
// to leave your computer unattended.

// You will also be able to change it later on, so if you just set up an account
// for trying things out, its okay to use something that you can type quickly. 

// FOOTNOTE: Once you are managing actual serious funds, we would recommend using a serious
// password too!!`,
//       image: "",
//       readMore: []
//    },
//    createNewAccount: {
//       question: "",
//       answer: "",
//       image: "",
//       readMore: []
//    },
//    passwordSetup: {
//       question: "",
//       answer: "",
//       image: "",
//       readMore: []
//    },
//    passwordSetup: {
//       question: "",
//       answer: "",
//       image: "",
//       readMore: []
//    },
// } 