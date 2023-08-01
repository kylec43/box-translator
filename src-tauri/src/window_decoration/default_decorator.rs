use crate::{
    lib_wrappers::window_wrapper::WindowWrapper, 
    util::screen_util_trait::ScreenUtilTrait
};
use super::window_decorator_trait::WindowDecoratorTrait;

pub struct DefaultDecorator {
    screen_util: Box<dyn ScreenUtilTrait>
}

impl DefaultDecorator {
    pub fn new(screen_util: Box<dyn ScreenUtilTrait>) -> DefaultDecorator {
        DefaultDecorator {
            screen_util
        }
    }
}

impl WindowDecoratorTrait for DefaultDecorator {
    fn decorate(&self, window: &mut WindowWrapper) -> Result<(), Box<dyn std::error::Error>> {
        let width = self.screen_util.get_screen_width();
        let width = if width < 800 { width } else { 800 };
        let height = self.screen_util.get_screen_height();
        let height = if height < 600 { height } else { 600 };

        window
            .set_decorations(true)?
            .set_physical_size(width, height);

        Ok(())
    }
}