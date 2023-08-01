extern crate x11;
use x11::xlib::*;

use super::screen_util_trait::ScreenUtilTrait;

pub struct LinuxScreenUtil {
    display: *mut _XDisplay
}

impl LinuxScreenUtil {
    pub fn new() -> Result<LinuxScreenUtil, Box<dyn std::error::Error>> {
        unsafe {
            let display = XOpenDisplay(std::ptr::null());
            if display.is_null() {
                return Err("Unable to get XDisplay".into())
            }
        
            let screen_util = LinuxScreenUtil {
                display
            };

            Ok(screen_util)
        }
    }
}

impl Drop for LinuxScreenUtil {
    fn drop(&mut self) {
        unsafe {
            if !self.display.is_null() {
                XCloseDisplay(self.display);
            }
        }
    }
}

impl ScreenUtilTrait for LinuxScreenUtil {
    fn get_screen_width(&self) -> u32 {
        unsafe {
            let default_screen = XDefaultScreen(self.display);
            XDisplayWidth(self.display, default_screen) as u32
        }
    }

    fn get_screen_height(&self) -> u32 {
        unsafe {
            let default_screen = XDefaultScreen(self.display);
            XDisplayHeight(self.display, default_screen) as u32
        }
    }
}