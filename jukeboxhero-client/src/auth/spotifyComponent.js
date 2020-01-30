// async componentDidMount() {
//     const tokenExpirationTime = await getUserData('expirationTime');
//     if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
//         await refreshTokens();
//     } else {
//         this.setState({ accessTokenAvailable: true });
//     }
// }