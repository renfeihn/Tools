package tc.bank.common.date;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

public class DateUtils {
	public static final String DEFAULT_PATTERN = "yyyy-MM-dd HH:mm:ss";
	public static final String YMDHMS_PATTERN = "yyyyMMddHHmmss";

	private static String guessPattern(String date) {
		if (date.length() == 14) {
			return YMDHMS_PATTERN;
		}
		return DEFAULT_PATTERN;
	}

	/**
	 * 秒转为日期
	 * 
	 * @param seconds
	 * @return
	 */
	public static Date secondsToDate(long seconds) {
		long timeMillis = seconds * 1000;
		Date date = new Date();
		date.setTime(timeMillis);
		return date;
	}

	/**
	 * 日期字符串转为日期
	 * 
	 * @param source
	 * @param pattern
	 * @return
	 * @throws ParseException
	 */
	public static Calendar parse(String source, String pattern)
			throws ParseException {
		if (source == null) {
			return null;
		}
		if (pattern == null || "".equals(pattern.trim())) {
			pattern = guessPattern(source);
		}

		SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
		Date date = dateFormat.parse(source);
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar;
	}

	/**
	 * 日期转为日期字符串
	 * 
	 * @param calendar
	 * @return
	 */
	public static String format(Calendar calendar, String pattern) {
		if (calendar == null) {
			return null;
		}
		if (pattern == null || "".equals(pattern.trim())) {
			pattern = DEFAULT_PATTERN;
		}
		SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
		return dateFormat.format(calendar.getTime());
	}

	public static String format(Date date, String pattern) {
		if (date == null) {
			return null;
		}
		if (pattern == null || "".equals(pattern.trim())) {
			pattern = DEFAULT_PATTERN;
		}
		SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
		return dateFormat.format(date);
	}

	/**
	 * timestamp字符串转为日期字符串
	 * 
	 * @param timestamp
	 * @param pattern
	 * @return
	 */
	public static String timestampToDate(String timestamp, String pattern) {
		if (timestamp == null || !timestamp.matches("\\d+")) {
			return null;
		}
		long time = Long.parseLong(timestamp);
		Calendar calendar = Calendar.getInstance();
		calendar.setTimeInMillis(time);
		return format(calendar, pattern);
	}

	/**
	 * @return 当前日期
	 */
	public static Calendar current() {
		return Calendar.getInstance();
	}

	/**
	 * @return 年月日 如 20160606
	 */
	public static Integer getDate(Calendar calendar) {
		if (calendar == null) {
			return null;
		}
		int year = calendar.get(Calendar.YEAR) * 10000;
		int month = (calendar.get(Calendar.MONTH) + 1) * 100;
		int day = calendar.get(Calendar.DAY_OF_MONTH);
		return year + month + day;
	}

	/**
	 * @return 时分秒 如 103030
	 */
	public static Integer getTime(Calendar calendar) {
		if (calendar == null) {
			return null;
		}
		int hour = calendar.get(Calendar.HOUR_OF_DAY) * 10000;
		int minute = calendar.get(Calendar.MINUTE) * 100;
		int second = calendar.get(Calendar.SECOND);
		return hour + minute + second;
	}

	/**
	 * @return 0000-00-00 00:00:00
	 */
	public static Calendar getZeroCalendar() {
		Calendar calendar = current();
		calendar.clear();
		return calendar;
	}

	public static int getDate() {
		return getDate(Calendar.getInstance());
	}

	public static int getTime() {
		return getTime(Calendar.getInstance());
	}

	public static String add(String sourceTime, String pattern, int field,
			int time) throws ParseException {
		Calendar calendar = parse(sourceTime, pattern);
		calendar.add(field, time);
		return format(calendar, pattern);
	}

	/**
	 * 计算 cal2 - cal1 的值，返回毫秒、秒、分钟或小时。如果field指定为Calendar.MINUTE，但两个时间差值不满1分钟，返回0
	 * ；如果field指定为Calendar.HOUR，但两个时间差值不满1小时，返回0；
	 * 
	 * @param cal1
	 * @param cal2
	 * @param field
	 *            Calendar.MILLISECOND、Calendar.SECOND、Calendar.MINUTE、Calendar.
	 *            HOUR
	 * @return
	 */
	public static long differ(Calendar cal1, Calendar cal2, int field) {
		long start = cal1.getTimeInMillis();
		long end = cal2.getTimeInMillis();
		long delta = 0;
		switch (field) {
		case Calendar.MILLISECOND:
			delta = end - start;
			break;
		case Calendar.SECOND:
			delta = TimeUnit.MILLISECONDS.toSeconds(end - start);
			break;
		case Calendar.MINUTE:
			delta = TimeUnit.MILLISECONDS.toMinutes(end - start);
			break;
		case Calendar.HOUR:
			delta = TimeUnit.MILLISECONDS.toHours(end - start);
			break;
		default:
			break;
		}
		return delta;
	}

	/**
	 * 查询昨天此刻日期yyyy-MM-dd HH:mm:ss
	 * 
	 * @return
	 */
	public static String getAtTimeYestoday() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DATE, -1);
		Date time = cal.getTime();
		String yestodayEtime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
				.format(time);
		return yestodayEtime;
	}

	/**
	 * 查询昨天零点日期yyyy-MM-dd 00:00:00
	 * 
	 * @return
	 */
	public static String getZeroYestoday() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DATE, -1);
		Date time = cal.getTime();
		String yestodayEtime = new SimpleDateFormat("yyyy-MM-dd").format(time);
		return yestodayEtime + " 00:00:00";
	}

	/**
	 * 根据今天日期,查询昨天开始日期 yyyy-MM-dd HH:mm:ss
	 * 
	 * @param today
	 * @param internal
	 * @param s
	 *            单位分：min 单位秒：sec
	 * @return s不匹配，默认返回昨天零点日期
	 * @throws Exception
	 */
	public static String getYesStartTime(String today, int internal, String s)
			throws Exception {
		if (null == today) {
			return null;
		}
		Date date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(today);
		Long yes = 0l;
		if ("min".equalsIgnoreCase(s)) {
			yes = date.getTime() - internal * 60 * 1000 - 24 * 60 * 60 * 1000;
		} else if ("sec".equalsIgnoreCase(s)) {
			yes = date.getTime() - internal * 1000 - 24 * 60 * 60 * 1000;
		} else {
			return getZeroYestoday();
		}
		return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(yes);
	}

	/**
	 * 根据今天日期，查询昨天日期
	 * 
	 * @param today
	 *            (yyyy-MM-dd HH:mm:ss)
	 * @return
	 * @throws Exception
	 */
	public static String getYesEndTime(String today) throws Exception {
		if (null != today && -1 == today.trim().indexOf(" ")) {
			return null;
		}
		String date = today.substring(today.trim().indexOf(" ") + 1);
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DATE, -1);
		Date time = cal.getTime();
		String yestodayEtime = new SimpleDateFormat("yyyy-MM-dd").format(time);
		return yestodayEtime + " " + date;
	}
}
