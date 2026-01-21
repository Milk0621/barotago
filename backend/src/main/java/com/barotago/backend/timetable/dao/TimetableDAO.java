package com.barotago.backend.timetable.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface TimetableDAO {
	List<Map<String, Object>> selectTimetableRaw(@Param("stationCd") String stationCd,@Param("weekTag") int weekTag);
}
