export function updateChats(chats) {
  return {
    type: 'UPDATE_CHATS',
    chats: chats
  }
}

export function updateUsers(users) {
  return {
    type: 'UPDATE_USERS',
    users: users
  }
}
