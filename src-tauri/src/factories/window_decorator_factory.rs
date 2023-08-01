use crate::{
    window_decoration::{
        console_decorator::ConsoleDecorator, 
        window_decorator_trait::WindowDecoratorTrait, 
        default_decorator::DefaultDecorator
    }, 
    util::screen_util_trait::ScreenUtilTrait
};

pub fn create_console_decorator(screen_util: Box<dyn ScreenUtilTrait>) -> Box<dyn WindowDecoratorTrait> {
    Box::new(ConsoleDecorator::new(screen_util))
}

pub fn create_default_decorator(screen_util: Box<dyn ScreenUtilTrait>) -> Box<dyn WindowDecoratorTrait> {
    Box::new(DefaultDecorator::new(screen_util))
}
