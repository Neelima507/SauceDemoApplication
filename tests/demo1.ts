let message1: string = "Hiiiiiii"
console.log(message1)
message1 = "ki"
console.log(message1)
let numbarray: number[] = [1, 2, 3]
console.log(numbarray)
let data: any = "any data type"
data = "bye"
console.log(data)
data = 21
console.log(data)
function login(userName: string, passWord: string): string {
    if (userName === "wrong") {
        return "Login Successfull"
    }
    else {
        return "login failed"
    }
}
let result1 = login("Stand", "paswo");

console.log(result1);