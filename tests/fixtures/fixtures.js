const uuids = [
 "6be3b95-fca1-4d0f-8891-326d9eea3357",
 "329b8489-ced9-4323-9169-3c0926490927", 
 "7f8e486e-cc17-4a2d-880d-eb2db84f71cc",
 "40d4ef86-910d-428c-97b5-1e35123a7013",
 "f409418a-1c18-481b-803f-b72759f0b476",
]


// REFACTOR to user-input type

let user1 = {
    // 'id': uuids[1],
    "user_number": 1,
    "phone": "1234",
    "name": "rick",
    "email": "rick@galaxy.io",
    "user_type": "lender",
    "balance": 1000,
    "demographic_info": {"country": "spaceland", education: "genius"}
}

let user2 = {
    "user_number": 2,
    "name": "summer",
    "phone": "1234",
    "email": "summer@highschool.io",
    "user_type": "borrower",
    "balance": 100,
    "demographic_info": {"country": "spaceland"}
}

let user3 = {
    // 'id': uuids[2],
    "user_number": 3,
    "phone": "1234",
    "name": "morty",
    "email": "morty@galaxy.io",
    "user_type": "borrower",
    "balance": 10,
    "demographic_info": {"country": "spaceland", education: 'little'}
}


export const USER4 = {
    "name": "noobnoob",
    "email": "noob@galaxy.io",
    "phone": "1234",
    "user_type": "lender",
    "user_number": 4,
    "balance": 2000,
    "demographic_info": {"country": "spaceland"}
}



// export const users = {1: user1, 2: user2, 3:user3}
export const USERS = {1: user1, 2: user2, 3: user3}

const basic_connections = [[1, 2, 100], [2, 3, 50]]
const basic_nodes = [1,2,3]
export const basic_network = {nodes: basic_nodes, edges: basic_connections}
