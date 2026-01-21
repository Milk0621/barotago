package com.barotago.backend.timetable.dto;

import java.util.ArrayList;
import java.util.List;

public class TimetableItemDTO {
	private String hour;
	private List<String> up = new ArrayList<>();
	private List<String> down = new ArrayList<>();
	
	public TimetableItemDTO(String hour) {
        this.hour = hour;
    }
	
	public String getHour() {
		return hour;
	}
	public void setHour(String hour) {
		this.hour = hour;
	}
	public List<String> getUp() {
		return up;
	}
	public void setUp(List<String> up) {
		this.up = up;
	}
	public List<String> getDown() {
		return down;
	}
	public void setDown(List<String> down) {
		this.down = down;
	}
}
