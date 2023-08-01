use crate::util::screen_util_trait::ScreenUtilTrait;

#[cfg(target_os = "windows")]
use crate::util::win_screen_util::WinScreenUtil;

#[cfg(target_os = "linux")]
use crate::util::linux_screen_util::LinuxScreenUtil;

#[cfg(target_os = "windows")]
pub fn create_screen_util() -> Result<Box<dyn ScreenUtilTrait>, Box<dyn std::error::Error>> {
    Ok(Box::new(WinScreenUtil::new()))
}

#[cfg(target_os = "linux")]
pub fn create_screen_util() -> Result<Box<dyn ScreenUtilTrait>, Box<dyn std::error::Error>> {
    Ok(Box::new(LinuxScreenUtil::new()))
}
