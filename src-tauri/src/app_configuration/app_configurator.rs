use tauri::{ Manager, App, Window };
use crate::{
    lib_wrappers::window_wrapper::WindowWrapper, 
    util::screen_util_trait::ScreenUtilTrait
};
use super::app_configurator_trait::AppConfiguratorTrait;


pub struct AppConfigurator {
    screen_util: Box<dyn ScreenUtilTrait>
}

impl AppConfiguratorTrait for AppConfigurator {
    fn configure_app<'a>(&self, app: &'a mut App) -> Result<&'a mut App, Box<dyn std::error::Error>> {
        let _ = self.configure_main_app_window(app)?;
        Ok(app)
    }
}

impl AppConfigurator {
    pub fn new(screen_util: Box<dyn ScreenUtilTrait>) -> AppConfigurator {
        AppConfigurator {
            screen_util
        }
    }
    
    fn configure_main_app_window(&self, app: &mut App) -> Result<Window, Box<dyn std::error::Error>> {
        if let Some(window) = app.get_window("main") {
            
            let width = self.screen_util.get_screen_width();
            let screen_height = self.screen_util.get_screen_height();
            let height = if screen_height < 400 { screen_height } else { 400 };
            let min_height = if height < 300 { height } else { 300 };

            let mut window = WindowWrapper::new(window);
            window
                .set_decorations(false)?
                .set_physical_size(width, height)
                .set_physical_position(0, 0)
                .set_physical_min_size(width, min_height)
                .show()?;
    
            return Ok(window.take());
        }
    
        Err("Error configuring app window".into())
    }
}