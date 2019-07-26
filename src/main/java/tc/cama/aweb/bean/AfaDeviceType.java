package tc.cama.aweb.bean;


public enum AfaDeviceType
{
  PLATFORM("platform"),  WORKGROUP("workgroup", "workgroups"),  MODULE("module"),  SVC("svc"),  DCM("dcm"),  DCMSERVICE("dcmService", "services"),  LSR("lsr", "lsrs"),  LSRSERVICE("lsrService", "services"),  OUT("out", "outs"),  OUTSERVICE("outService", "services"),  SERVICE("service");
  
  private String name;
  private String parentName;
  
  private AfaDeviceType(String name)
  {
    this.name = name;
  }
  
  private AfaDeviceType(String name, String parentName)
  {
    this(name);
    this.parentName = parentName;
  }
  
  public String getName()
  {
    return this.name;
  }
  
  public String getParentName()
  {
    return this.parentName != null ? this.parentName : this.name;
  }
}