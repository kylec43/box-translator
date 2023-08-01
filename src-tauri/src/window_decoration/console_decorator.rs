use super::window_decorator_trait::WindowDecoratorTrait;
use crate::{
    lib_wrappers::window_wrapper::WindowWrapper, 
    util::screen_util_trait::ScreenUtilTrait,
};

pub struct ConsoleDecorator {
    screen_util: Box<dyn ScreenUtilTrait>,
}

impl ConsoleDecorator {
    pub fn new(screen_util: Box<dyn ScreenUtilTrait>) -> ConsoleDecorator {
        ConsoleDecorator { 
            screen_util 
        }
    }
}

impl WindowDecoratorTrait for ConsoleDecorator {
    fn decorate(&self, window: &mut WindowWrapper) -> Result<(), Box<dyn std::error::Error>> {
        let width = self.screen_util.get_screen_width();
        let screen_height = self.screen_util.get_screen_height();
        let height = if screen_height < 400 {
            screen_height
        } else {
            400
        };
        let min_height = if height < 300 { height } else { 300 };

        window
            .set_decorations(false)?
            .set_physical_size(width, height)
            .set_physical_position(0, 0)
            .set_physical_min_size(width, min_height);

        Ok(())
    }
}
