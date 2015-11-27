/*
 * 
 * 创建日期：2010-4-16 下午12:59:12
 *
 * 创  建  人 ：chenjpu
 * 
 * 版权所有：J.Bob
 */

package org.smartas.core;

/**
 * 字符转换类
 * @author csx
 *
 */

public final class StringUtil {
	private StringUtil() {

	}

	/**
	 * 把字符串中的带‘与"转成\'与\"
	 * @param orgStr
	 * @return
	 */
	public static String convertQuot(String orgStr) {
		return orgStr.replace("'", "\\'").replace("\"", "\\\"");
	}

	/*public static synchronized String encryptSha256(String inputStr) {
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-256");

			byte digest[] = md.digest(inputStr.getBytes("UTF-8"));

			return new String(Base64.encodeBase64(digest));

			//return (new BASE64Encoder()).encode(digest);
			//return new String(Hex.encodeHex(digest));
		} catch (Exception e) {
			return null;
		}
	}*/

	public static void main(String[] args) {
		//String password = "111";
		//String result = encryptSha256(password);

		//byte[]dis={-10, -32, -95, -30, -84, 65, -108, 90, -102, -89, -1, -118, -118, -86, 12, -21, -63, 42, 59, -52, -104, 26, -110, -102, -43, -49, -127, 10, 9, 14, 17, -82};
		//System.out.println("array:"+ new String(Hex.encodeHex(dis)));
		//System.out.println("result:" + result);
	}
}
