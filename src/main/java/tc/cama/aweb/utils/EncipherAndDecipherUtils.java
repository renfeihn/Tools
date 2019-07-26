package tc.cama.aweb.utils;

import cn.com.agree.afa.util.Base64;
import cn.com.agree.afa.util.DesUtils;

public class EncipherAndDecipherUtils
{
  private static final String CHARSET = "UTF-8";
  private static final String KEY = "AFA4J0123456789ZYXWVUTSR";
  
  public String encodeBase64(String plainText)
  {
    return new Base64().encode(plainText);
  }
  
  public String decodeBase64(String cipherText)
  {
    return new Base64().decode(cipherText);
  }
  
  public String encode3Des(String plainText)
  {
    try
    {
      byte[] cipherBytes = DesUtils.encrypt3(plainText.getBytes("UTF-8"), "AFA4J0123456789ZYXWVUTSR".getBytes("UTF-8"));
      return new String(new Base64().encode(cipherBytes), "UTF-8");
    }
    catch (Exception e) {}
    return plainText;
  }
  
  public String decode3Des(String cipherText)
  {
    try
    {
      byte[] plainBytes = new Base64().decode(cipherText.getBytes("UTF-8"));
      return new String(DesUtils.decrypt3(plainBytes, "AFA4J0123456789ZYXWVUTSR".getBytes("UTF-8")), "UTF-8");
    }
    catch (Exception e) {}
    return cipherText;
  }
}

