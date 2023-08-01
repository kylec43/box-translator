use crate::app_configuration::{ 
    app_configurator_trait::AppConfiguratorTrait, 
    app_configurator::AppConfigurator
};

use crate::util::screen_util_trait::ScreenUtilTrait;

#[cfg(target_os = "windows")]
use crate::util::win_screen_util::WinScreenUtil;

#[cfg(target_os = "linux")]
use crate::util::linux_screen_util::LinuxScreenUtil;


#[cfg(target_os = "windows")]
pub fn create_configurator() 
-> Result<Box<dyn AppConfiguratorTrait>, Box<dyn std::error::Error>> {
    let screen_util = Box::new(WinScreenUtil::new());
    let configurator = create(screen_util);
    Ok(configurator)
}

#[cfg(target_os = "linux")]
pub fn create_configurator() 
-> Result<Box<dyn AppConfiguratorTrait>, Box<dyn std::error::Error>> {
    let screen_util = Box::new(LinuxScreenUtil::new()?);
    let configurator = create(screen_util);
    Ok(configurator)
}

fn create(screen_util: Box<dyn ScreenUtilTrait>) -> Box<dyn AppConfiguratorTrait> {
    Box::new(AppConfigurator::new(screen_util))
}