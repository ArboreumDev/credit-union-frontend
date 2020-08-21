export const getUserPortfolio =  (userList) => {
  let ret = {}
  userList.forEach(user => {
    ret[user.id] = {cash: user.balance, share: user.corpus_share}
  });
  return ret
}