use super::screen_util_factory::create_screen_util;
use crate::app_configuration::{
    app_configurator::AppConfigurator, app_configurator_trait::AppConfiguratorTrait,
};

pub fn create_configurator() -> Result<Box<dyn AppConfiguratorTrait>, Box<dyn std::error::Error>> {
    let screen_util = create_screen_util()?;
    let configurator = Box::new(AppConfigurator::new(screen_util));
    Ok(configurator)
}
