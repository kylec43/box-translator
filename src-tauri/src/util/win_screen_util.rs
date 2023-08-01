extern crate winapi;
use super::screen_util_trait::ScreenUtilTrait;
use winapi::um::winuser::{GetSystemMetrics, SM_CXSCREEN, SM_CYSCREEN};

pub struct WinScreenUtil;

impl WinScreenUtil {
    pub fn new() -> WinScreenUtil {
        WinScreenUtil
    }
}

impl ScreenUtilTrait for WinScreenUtil {
    fn get_screen_width(&self) -> u32 {
        unsafe {
            GetSystemMetrics(SM_CXSCREEN) as u32
        }
    }

    fn get_screen_height(&self) -> u32 {
        unsafe {
            GetSystemMetrics(SM_CYSCREEN) as u32
        }
    }
}