const BASE_URL_MESSAGE = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/message`;
const BASE_URL_CHAT = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/chat`;

const createChat = async(user1, user2) => {
    try {
        const res = await fetch(`${BASE_URL_CHAT}/${user1}/${user2}`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        })
        return await res.json();
    } catch (error) {
        console.log(error)
    }
}

export {
    createChat,
}