package tc.cama.aweb.utils;


import java.util.Arrays;
import java.util.List;

public abstract interface SchemaLabels
{
  public static final String ID = "id";
  public static final String NAME = "name";
  public static final String MINOCCURRS = "minOccurs";
  public static final String MAXOCCURS = "maxOccurs";
  public static final String REF = "ref";
  public static final String TYPE = "type";
  public static final String DEF = "default";
  public static final String DESC = "desc";
  public static final String USE = "use";
  public static final String BASE = "base";
  public static final String VALUE = "value";
  public static final String OPTIONS = "options";
  public static final String CANISOLATE = "canIsolate";
  public static final String CUSTOMIZABLE = "customizable";
  public static final String AUTOAPPLY = "autoApply";
  public static final String PROPERTY = "property";
  public static final String PLATFORM = "xs:element[@name='platform']";
  public static final String REFERENCE = "xs:element[@name!='platform']";
  public static final String COMPLEXTYPE = "xs:complexType";
  public static final String ROOT_ELEMENT = "xs:element";
  public static final String TYPE_ELEMENT = "xs:sequence/xs:element";
  public static final String APPINFO_ELEMENT = "xs:annotation/xs:appinfo/xs:element";
  public static final String SON_ELEMENT = "xs:complexType/xs:sequence/xs:element";
  public static final String ANNOTATION = "xs:annotation/xs:documentation";
  public static final String RESTRICTION = "xs:simpleType/xs:restriction";
  public static final String ENUMERATION = "xs:simpleType/xs:restriction/xs:enumeration";
  public static final String MINLENGTH = "xs:simpleType/xs:restriction/xs:minLength";
  public static final String MAXLENGTH = "xs:simpleType/xs:restriction/xs:maxLength";
  public static final String MINEXCLUSIVE = "xs:simpleType/xs:restriction/xs:minExclusive";
  public static final String MAXINCLUSIVE = "xs:simpleType/xs:restriction/xs:maxInclusive";
  public static final String ATTRIBUTE = "xs:complexType/xs:attribute";
  public static final String TYPE_ATTRIBUTE = "xs:attribute";
  public static final String LSR_TYPE_ELEMENT = "xs:complexType[@name='lsrType']";
  public static final String OUT_TYPE_ELEMENT = "xs:complexType[@name='outType']";
  public static final String DCM_TYPE_ELEMENT = "xs:complexType[@name='dcmType']";
  public static final List<String> MODULE_XPATH_LIST = Arrays.asList(new String[] {
    "//xs:element[@type='svcType']", 
    "//xs:element[@type='dcmType']", 
    "//xs:element[@type='outType']", 
    "//xs:element[@type='lsrType']" });
  public static final List<String> PLAT_XPATH_LIST = Arrays.asList(new String[] {
    "//xs:element[@name='platform']", 
    "//xs:element[@name='workgroup']" });
  public static final List<?> TYPE_LIST = Arrays.asList(new String[] { "lsrType", "outType", "svcType", "dcmType", "applogType" });
  public static final List<String> CUSTOM_XPATH_LIST = Arrays.asList(new String[] {
    "//xs:element[@name='dbConnPools']", 
    "//xs:element[@name='hibernate']", 
    "//xs:element[@name='caches']", 
    "//xs:element[@name='rmiUrls']", 
    "//xs:element[@name='whitelist']", 
    "//xs:element[@name='monitor']", 
    "//xs:element[@name='global']/xs:complexType/xs:sequence/xs:element[@name='scriptPaths']", 
    "//xs:element[@name='tciOptions']/xs:complexType/xs:sequence/xs:element[@name='otherProviderAddrs']", 
    "//xs:element[@name='paramMemorize']/xs:complexType/xs:sequence/xs:element[@name='paramSources']", 
    "//xs:element[@name='registryOptions']/xs:complexType/xs:sequence/xs:element[@name='registry']", 
    "//xs:complexType/xs:sequence/xs:element[@name='codec']/xs:complexType/xs:sequence/xs:element[@name='protocol']", 
    "//xs:complexType[@name='applogType']/xs:sequence/xs:element[@name='customizedTrades']" });
}

