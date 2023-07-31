use tauri::{ Manager, App, Window };
use crate::{
    lib_wrappers::window_wrapper::WindowWrapper, 
    util::screen_util_trait::ScreenUtilTrait
};
use super::app_configurator_trait::AppConfiguratorTrait;

pub struct MinimalConfigurator {
    screen_util: Box<dyn ScreenUtilTrait>
}

impl AppConfiguratorTrait for MinimalConfigurator {
    fn configure_app<'a>(&self, app: &'a mut App) -> Result<&'a mut App, Box<dyn std::error::Error>> {
        let _ = self.configure_main_app_window(app)?;
        Ok(app)
    }
}

impl MinimalConfigurator {
    pub fn new(screen_util: Box<dyn ScreenUtilTrait>) -> MinimalConfigurator {
        MinimalConfigurator {
            screen_util
        }
    }
    
    fn configure_main_app_window(&self, app: &mut App) -> Result<Window, Box<dyn std::error::Error>> {
        if let Some(window) = app.get_window("main") {
            
            let width = self.screen_util.get_screen_width();
            let width = if width < 800 { width } else { 800 };
            let height = self.screen_util.get_screen_height();
            let height = if height < 600 { height } else { 600 };

            let mut window = WindowWrapper::new(window);
            window
                .set_physical_size(width, height)
                .show()?;
    
            return Ok(window.take());
        }
    
        Err("Error configuring app window".into())
    }
}