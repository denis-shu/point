const user = {
    _id: '1',
    name: 'Den',
    email: 'den@gmail.com',
    picture: 'https://exxxxxxx'
}


module.exports  = {
    Query: {
        me: () => user
    }
}