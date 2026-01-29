package com.barotago.backend.timetable.dto;

public class TimetableMinuteDTO {
	private String minute;
	private boolean isExpress;
	
	public TimetableMinuteDTO(String minute, boolean isExpress) {
		 this.minute = minute;
		 this.isExpress = isExpress;
	}
	
	public String getMinute() {
		return minute;
	}
	public void setMinute(String minute) {
		this.minute = minute;
	}
	public boolean isExpress() {
		return isExpress;
	}
	public void setExpress(boolean isExpress) {
		this.isExpress = isExpress;
	}
}
