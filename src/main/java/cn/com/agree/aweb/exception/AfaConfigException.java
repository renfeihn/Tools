package cn.com.agree.aweb.exception;


public class AfaConfigException
  extends ExceptionBase
{
  private static final long serialVersionUID = -6750174944608396632L;
  
  public AfaConfigException(String errorMsg)
  {
    super(errorMsg);
  }
  
  public AfaConfigException(Throwable cause)
  {
    super(cause);
  }
}
