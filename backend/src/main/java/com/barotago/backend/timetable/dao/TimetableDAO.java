package com.barotago.backend.timetable.dao;

import java.util.List;
import java.util.Map;

public interface TimetableDAO {
	List<Map<String, Object>> selectTimetableRaw(String stationCd, int weekTag);
}
