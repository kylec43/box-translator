use crate::lib_wrappers::window_wrapper::WindowWrapper;

pub trait WindowDecoratorTrait {
    fn decorate(&self, window: &mut WindowWrapper) -> Result<(), Box<dyn std::error::Error>>;
}