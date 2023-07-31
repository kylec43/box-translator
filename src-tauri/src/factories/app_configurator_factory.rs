use crate::{
    app_configuration::{ 
        app_configurator_trait::AppConfiguratorTrait, 
        app_configurator::AppConfigurator, 
        minimal_configurator::MinimalConfigurator 
    }, 
    util::{
        win_screen_util::WinScreenUtil, 
        screen_util_trait::ScreenUtilTrait
    }
};


pub fn create_app_configurator(os: &str) -> Result<Box<dyn AppConfiguratorTrait>, Box<dyn std::error::Error>> {
    match os {
        "windows" => {
            let screen_util = Box::new(WinScreenUtil::new());
            let configurator = create_impl(screen_util);
            return Ok(configurator);
        },
        other => return Err(format!("Error finding app configurator for this OS: {}", other).into())
    }
}

fn create_impl(screen_util: Box<dyn ScreenUtilTrait>) -> Box<dyn AppConfiguratorTrait> {
    return Box::new(AppConfigurator::new(screen_util));
}