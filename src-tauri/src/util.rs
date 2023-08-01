pub mod screen_util_trait;

#[cfg(target_os = "windows")]
pub mod win_screen_util;

#[cfg(target_os = "linux")]
pub mod linux_screen_util;