package tc.bank.common.utils;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import com.aim.alibaba.fastjson.JSONObject;

import tc.bank.common.core.Point;
import tc.bank.common.core.Timeline;
import tc.bank.common.date.DateUtils;

/**
 * Point转Timeline工具类
 * 
 * @author Win7-user
 * 
 */
public class TimelineUtils {

	public static final String ECHARTS_DATA = "echartsData";

	public static <Y> JSONObject toEchartsData(Timeline<Y> timeline) {
		if (timeline == null) {
			return new JSONObject();
		}
		List<String> time = new ArrayList<String>();
		for (Date date : timeline.getTimes()) {
			time.add(DateUtils.format(date, "HH:mm"));
		}
		JSONObject data = new JSONObject();
		data.put("time", time);
		
		if(timeline.getDatas()==null || timeline.getDatas().size()==0){
			data.put("line1", new ArrayList<Double>());
		}
		
		for (int i = 0; i < timeline.getDatas().size(); i++) {
			data.put("line" + (i + 1), timeline.getDatas().get(i));
		}
		data.put("items", timeline.getAlias());
		
//		data.put("unit", timeline.getUnit());
		
		if (timeline.getX() != null) {
			data.put("x", DateUtils.format(timeline.getX(), "HH:mm"));
		}
		if (timeline.getY() != null) {
			data.put("y", timeline.getY());
		}
		return data;
	}

	public static PointHandler<Integer> INT_HANDLER() {
		return new PointHandler<Integer>() {
			private int num = 0;

			@Override
			public Integer defaultValue() {
				return Integer.valueOf(0);
			}

			@Override
			public void reset() {
				num = 0;
			}

			@Override
			public void add(Integer y) {
				num += y.intValue();
			}

			@Override
			public Integer avg(int times) {
				return Integer.valueOf(num / times);
			}
		};
	}

	public static PointHandler<Double> DOUBLE_HANDLER() {
		return new PointHandler<Double>() {
			private double num = 0;

			@Override
			public Double defaultValue() {
				return Double.valueOf(0);
			}

			@Override
			public void reset() {
				num = 0;
			}

			@Override
			public void add(Double y) {
				if (y == null) {
					return;
				}
				String sy = String.valueOf(Double.NaN);
				if (sy.equals(y.toString())) {
					return;
				}
				num += y.doubleValue();
			}

			@Override
			public Double avg(int times) {
				BigDecimal bd = new BigDecimal(times <= 0 ? num : num / times);
				bd.setScale(2, RoundingMode.UP);
				return bd.doubleValue();
			}
		};
	}

	public static abstract class PointHandler<Y extends Number> {
		/**
		 * @return 默认值
		 */
		public abstract Y defaultValue();

		/**
		 * 重新计数
		 */
		public abstract void reset();

		/**
		 * @param 新增一个点
		 */
		public abstract void add(Y y);

		/**
		 * 取平均值
		 * 
		 * @param times
		 * @return
		 */
		public abstract Y avg(int times);
	}

	/**
	 * @param startDate
	 *            开始时间
	 * @param endDate
	 *            结束时间
	 * @param interval
	 *            时间间隔
	 * @param unit
	 *            间隔单位
	 * @param points
	 *            数据
	 * @param handler
	 *            数据处理
	 * @return
	 */
	public static <Y extends Number> Timeline<Y> getTimeline(Date startDate,
			Date endDate, long interval, TimeUnit unit,
			List<Point<Date, Y>> points, PointHandler<Y> handler) {
		List<List<Point<Date, Y>>> pointsList = new ArrayList<List<Point<Date, Y>>>();
		pointsList.add(points);
		return getTimeline2(startDate, endDate, interval, unit, pointsList,
				handler);
	}

	/**
	 * @param startDate
	 *            开始时间
	 * @param endDate
	 *            结束时间
	 * @param interval
	 *            时间间隔
	 * @param unit
	 *            间隔单位
	 * @param lines
	 *            数据
	 * @param handler
	 *            数据处理
	 * @return
	 */
	public static <Y extends Number> Timeline<Y> getTimeline2(Date startDate,
			Date endDate, long interval, TimeUnit unit,
			List<List<Point<Date, Y>>> lines, PointHandler<Y> handler) {
		if (unit == null) {
			unit = TimeUnit.SECONDS;
		}
		if (endDate == null) {
			endDate = DateUtils.current().getTime();
		}
		if (startDate == null) {
			long startSeconds = (long) (endDate.getTime() * 0.001 - 59 * 60);
			startDate = DateUtils.secondsToDate(startSeconds);
		}
		long startTime = startDate.getTime();
		long endTime = endDate.getTime();
		long intervalTime = unit.toMillis(interval);
		if (intervalTime < 1000) {
			intervalTime = 60000;
		}

		// 处理时间
		List<Date> time = new ArrayList<Date>();
		for (long i = startTime; i <= endTime; i += intervalTime) {
			time.add(new Date(i));
		}
		// 处理数据
		List<List<Y>> datas = new ArrayList<List<Y>>(lines.size());
		for (List<Point<Date, Y>> line : lines) {
			List<Y> mData = new ArrayList<Y>();
			datas.add(mData);
			if (line.isEmpty()) {
				continue;
			}
			// line排序
			Comparator<Point<Date, Y>> comparator = new Comparator<Point<Date, Y>>() {
				@Override
				public int compare(Point<Date, Y> p1, Point<Date, Y> p2) {
					return p1.getX().compareTo(p2.getX());
				}
			};
			Collections.sort(line, comparator);
			Date lineMexDate = line.get(line.size() - 1).getX();
			for (Date date : time) {
				// 如果date大于points最大时间，直接退出
				if (date.getTime() > lineMexDate.getTime()) {
					break;
				}
				handler.reset();
				int t = 0;
				for (Point<Date, Y> point : line) {
					if (point.getX().getTime() <= (date.getTime() - intervalTime)) {
						continue;
					}
					if (point.getX().getTime() > (date.getTime())) {
						break;
					}
					handler.add(point.getY());
					t += 1;
				}
				if (t == 0) {
					mData.add(handler.defaultValue());
				} else {
					mData.add(handler.avg(t));
				}
			}
		}

		Timeline<Y> timeline = new Timeline<Y>();
		timeline.setTimes(time);
		timeline.setDatas(datas);
		return timeline;
	}
	
	public static Timeline<String> numberFormat(Timeline<Double> echartsData){
		Timeline<String> result = new Timeline<String>();
		if(null!=echartsData){
			//echartsData到result塞值
			result.setAlias(echartsData.getAlias());
			result.setTimes(echartsData.getTimes());
			result.setUnit(echartsData.getUnit());
			//data处理
			List<List<String>> resultDatas = new ArrayList<List<String>>();
			List<String> resultData = new ArrayList<String>();
			List<List<Double>> datas = echartsData.getDatas();
			if(null!=datas && datas.size()>0){
				//[line1,line2,...]
				resultDatas = new ArrayList<List<String>>();
				for(List<Double> data:datas){
					if(null!=data && data.size()>0){
						//line1
						resultData = new ArrayList<String>();
						for(Double d:data){
							//data塞值
							resultData.add(getNumberFormat(d));
						}
						resultDatas.add(resultData);
					}
					
				}
				
			}
			result.setDatas(resultDatas);
		}
		return result;
	}
	
	public static Timeline<String> integerFormat(Timeline<Double> echartsData){
		Timeline<String> result = new Timeline<String>();
		if(null!=echartsData){
			//echartsData到result塞值
			result.setAlias(echartsData.getAlias());
			result.setTimes(echartsData.getTimes());
			result.setUnit(echartsData.getUnit());
			//data处理
			List<List<String>> resultDatas = new ArrayList<List<String>>();
			List<String> resultData = new ArrayList<String>();
			List<List<Double>> datas = echartsData.getDatas();
			if(null!=datas && datas.size()>0){
				//[line1,line2,...]
				resultDatas = new ArrayList<List<String>>();
				for(List<Double> data:datas){
					if(null!=data && data.size()>0){
						//line1
						resultData = new ArrayList<String>();
						for(Double d:data){
							//data塞值
							resultData.add(getIntegerFormat(d));
						}
						resultDatas.add(resultData);
					}
					
				}
				
			}
			result.setDatas(resultDatas);
		}
		return result;
	}
	// 保留两位小数
	private static String getNumberFormat(Double num) {
		DecimalFormat df = new DecimalFormat("#0.00");
		return df.format(num);
	}
	// 保留整数
	private static String getIntegerFormat(Double num) {
		DecimalFormat df = new DecimalFormat("#0");
		return df.format(num);
	}
}
