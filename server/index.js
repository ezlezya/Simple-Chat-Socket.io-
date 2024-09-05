import express from 'express'
import { Server } from 'socket.io'

const app = express()

const server = app.listen(5000, () => console.log("server listened"))
const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

//1.Підключення сокета;
//2.Прослуховувач івента на підключення;
//3.Прослуховувач івента на підключення до кімнати;
//4.Підключаємо до певної кімнати. data - міститься кімната, яку вказуємо на фронтенді;
//5.Прослуховувач івента на відправку повідомлення. В дата лежить повідомлення - об'єкт, який містить
//саме повідомлення, кімнату та ім'я користувача;
//6.За допомогою io.emit відбувається відправлення повідомлення усім. to - для того щоб відправлялось
//в певно зазначену нами кімнату;

io.on('connection', (socket) => {  //1.
    socket.on('connection', (data) => {  //2.
        console.log(data)
    })
    socket.on('join_room', (data) => {  //3.
        socket.join(data)  //4.
    })
    socket.on('send_message', (data) => {  //5.
        const { message, _, user } = data
        io.to(data.room).emit('send_message', { message, user })  //6.
    })
})