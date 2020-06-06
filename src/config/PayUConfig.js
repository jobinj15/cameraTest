export default config = {
    MER_KEY : 'P56zM8Dg',
    SALT : 'Y1vTYE79YW',
    MER_ID : '5000768',
    AUTH_HEADER : 'DbnJglAkbOJzJBoBGrYDQ2mFeOJgbiRzQwW2lElE0Ug='
}









// private String hashCal(String type, String hashString){
//     byte[] hashseq = str.getBytes();
//     StringBuffer hexString = new StringBuffer();
//     try {
//         MessageDigest algorithm = MessageDigest.getInstance(type);
//         algorithm.reset();
//         algorithm.update(hashseq);
//         byte messageDigest[] = algorithm.digest();
//         for (int i = 0; i < messageDigest.length; i++) {
//             String hex = Integer.toHexString(0xFF & messageDigest[i]);
//             if (hex.length() == 1) {
//                 hexString.append("0");
//             }
//             hexString.append(hex);
//         }

//     } catch (NoSuchAlgorithmException nsae) {
//     }
//     Log.e(TAG, "GenHashLocal: " + hexString);
//     return hexString.toString();
