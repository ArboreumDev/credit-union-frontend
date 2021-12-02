
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

export const questions = {
   clarification: {
      question: "",
      position: "0",
      answer: "In the following we will ask you to create an AlgoConnect Wallet. This is a digital wallet in which you can store assets & currencies from the Algorand Blockchain and that you will use to interact with our website.",
      image: "",
      readMore: [
         {
            question: "Why do I need it?",
            answer: whyAlgoAnswer,
            position: 0
         },
         {
            question: "What is AlgoConnect?",
            answer: `Its an external Wallet-Software Provider. It helps you create, store and manage
Algorand-Accounts in a way that all sensitive information remains on your
computer. 

AlgoConnect is developed by Randlabs, who TODO
do they earn money with it? is my data safe?`,
            position: 1
         },
         {
            question: "Will I forever be required to use AlgoConnect?",
            answer: `No. A really neat thing about blockchain identities is that you can take them
with you very easily. We have chosen to use AlgoConnect now, but more, better or
just other options will be available in the future.`,
            position: 2
         },
         {
            question: "What is it? I still dont get it?",
            answer: `Don't worry. While the underlying cryptocraphy is hard, using a wallet is
    quite simple if you're following a few principles. Check those out HERE or
    just follow the steps to set up an account. The process is simple (think less than 3 minutes), free and
    explains what you need to know along the way.`,
            position: 4
         }
      ]
   },
   passwordSetup: {
      question: "",
      answer: `This is a password that you will use to AUTHORIZE your transactions & actions
that you do. Also, you will regularly use it to UNLOCK your wallet: 
As it has so much sensitive information, your wallet will quickly lock itself if you're not
using it, so that nobody can steal your funds or act as you, even if you happen
to leave your computer unattended.

You will also be able to change it later on, so if you just set up an account
for trying things out, its okay to use something that you can type quickly. 

FOOTNOTE: Once you are managing actual serious funds, we would recommend using a serious
password too!!`,
      image: "",
      readMore: []
   },
   createNewAccount: {
      question: "",
      answer: "",
      image: "",
      readMore: []
   },
   passwordSetup: {
      question: "",
      answer: "",
      image: "",
      readMore: []
   },
   passwordSetup: {
      question: "",
      answer: "",
      image: "",
      readMore: []
   },




} 
