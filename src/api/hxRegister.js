import request from "@/utils/request";

// export const userReg = () => request({
//   method: ''
// })

export const getFriends = (username) => request({
  method: 'GET',
  url: `http://a1.easemob.com/1118211220116106/demo/users/${username}/contacts/users`
})
