import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface TomatoVariety {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  characteristics: {
    taste: string;
    size: string;
    season: string;
    uses: string[];
  };
  inStock: boolean;
}

interface CartItem extends TomatoVariety {
  quantity: number;
}

const tomatoVarieties: TomatoVariety[] = [
  {
    id: 1,
    name: "Черри томаты",
    description: "Сладкие миниатюрные помидоры, идеальные для салатов",
    price: 320,
    image: "/img/b7280147-32f3-4441-98f5-7e32bee1f76c.jpg",
    characteristics: {
      taste: "Сладкий, насыщенный",
      size: "15-20 мм",
      season: "Июль-Сентябрь",
      uses: ["Салаты", "Закуски", "Декор блюд"]
    },
    inStock: true
  },
  {
    id: 2,
    name: "Говядина",
    description: "Крупные мясистые томаты с нежной мякотью",
    price: 450,
    image: "/img/cac75688-9aa3-447d-a958-56e2fdffc52b.jpg",
    characteristics: {
      taste: "Мясистый, сладковатый",
      size: "200-400 г",
      season: "Август-Октябрь",
      uses: ["Салаты", "Соки", "Соусы"]
    },
    inStock: true
  },
  {
    id: 3,
    name: "Сливка розовая",
    description: "Удлиненные плоды с плотной мякотью",
    price: 380,
    image: "/img/b7280147-32f3-4441-98f5-7e32bee1f76c.jpg",
    characteristics: {
      taste: "Сладко-кислый",
      size: "60-80 г",
      season: "Июль-Сентябрь",
      uses: ["Консервация", "Соления", "Соусы"]
    },
    inStock: true
  },
  {
    id: 4,
    name: "Бычье сердце",
    description: "Крупные сердцевидные томаты премиум качества",
    price: 520,
    image: "/img/cac75688-9aa3-447d-a958-56e2fdffc52b.jpg",
    characteristics: {
      taste: "Сладкий, ароматный",
      size: "300-600 г",
      season: "Август-Сентябрь",
      uses: ["Свежие салаты", "Нарезка", "Соки"]
    },
    inStock: false
  }
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (tomato: TomatoVariety) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === tomato.id);
      if (existing) {
        return prev.map(item =>
          item.id === tomato.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...tomato, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-tomato-cream">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-tomato-brown/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              🍅
            </div>
            <div>
              <h1 className="text-2xl font-bold text-tomato-brown">Ферма "Красный сад"</h1>
              <p className="text-sm text-gray-600">Свежие помидоры с любовью</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#catalog" className="text-tomato-brown hover:text-primary transition-colors">Каталог</a>
            <a href="#about" className="text-tomato-brown hover:text-primary transition-colors">О ферме</a>
            <a href="#delivery" className="text-tomato-brown hover:text-primary transition-colors">Доставка</a>
            <a href="#reviews" className="text-tomato-brown hover:text-primary transition-colors">Отзывы</a>
            <a href="#contacts" className="text-tomato-brown hover:text-primary transition-colors">Контакты</a>
          </nav>

          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative border-tomato-brown text-tomato-brown hover:bg-tomato-brown hover:text-white">
                <Icon name="ShoppingCart" size={20} />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-primary">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Корзина ({getTotalItems()} товаров)</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Корзина пуста</p>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center space-x-3 bg-white p-3 rounded-lg">
                          <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-primary font-semibold">{item.price} ₽/кг</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Итого:</span>
                        <span className="text-primary">{getTotalPrice()} ₽</span>
                      </div>
                      <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-tomato-red/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-tomato-brown mb-6">
            Свежие помидоры<br />прямо с грядки
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Выращиваем экологически чистые томаты на нашей семейной ферме. 
            Без химии, с заботой о природе и вашем здоровье.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Icon name="ShoppingCart" className="mr-2" size={20} />
              Выбрать сорта
            </Button>
            <Button variant="outline" size="lg" className="border-tomato-brown text-tomato-brown hover:bg-tomato-brown hover:text-white">
              <Icon name="Play" className="mr-2" size={20} />
              О нашей ферме
            </Button>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-tomato-brown mb-4">Каталог сортов</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              У нас вы найдете лучшие сорта томатов, выращенные с соблюдением всех агротехнических требований
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tomatoVarieties.map(tomato => (
              <Card key={tomato.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={tomato.image} 
                    alt={tomato.name}
                    className="w-full h-48 object-cover"
                  />
                  {!tomato.inStock && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      Нет в наличии
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-tomato-brown">{tomato.name}</CardTitle>
                  <CardDescription>{tomato.description}</CardDescription>
                  <div className="text-2xl font-bold text-primary">{tomato.price} ₽/кг</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Вкус:</span>
                        <p className="text-tomato-brown">{tomato.characteristics.taste}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Размер:</span>
                        <p className="text-tomato-brown">{tomato.characteristics.size}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Сезон:</span>
                        <p className="text-tomato-brown">{tomato.characteristics.season}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Применение:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {tomato.characteristics.uses.slice(0, 2).map(use => (
                            <Badge key={use} variant="secondary" className="text-xs">
                              {use}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => addToCart(tomato)}
                    disabled={!tomato.inStock}
                    className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50"
                  >
                    <Icon name="Plus" className="mr-2" size={16} />
                    {tomato.inStock ? 'В корзину' : 'Недоступно'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold text-tomato-brown mb-6">О нашей ферме</h3>
              <p className="text-gray-700 mb-4">
                Семейная ферма "Красный сад" работает уже более 15 лет. Мы специализируемся на выращивании 
                экологически чистых томатов различных сортов.
              </p>
              <p className="text-gray-700 mb-6">
                Наши помидоры выращиваются без использования химических удобрений и пестицидов. 
                Мы используем только органические методы земледелия и традиционные агротехнические приемы.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">15+</div>
                  <div className="text-gray-600">лет опыта</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">20+</div>
                  <div className="text-gray-600">сортов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-gray-600">эко продукт</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/img/cac75688-9aa3-447d-a958-56e2fdffc52b.jpg" 
                alt="Наша ферма"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section id="delivery" className="py-16 bg-tomato-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-tomato-brown mb-4">Доставка</h3>
            <p className="text-gray-600">Быстрая и бережная доставка свежих томатов</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <Icon name="Truck" size={48} className="mx-auto mb-4 text-primary" />
              <h4 className="text-xl font-bold text-tomato-brown mb-2">По городу</h4>
              <p className="text-gray-600 mb-4">Доставка в течение дня по Москве и МО</p>
              <div className="text-lg font-semibold text-primary">От 300 ₽</div>
            </Card>

            <Card className="text-center p-6">
              <Icon name="Package" size={48} className="mx-auto mb-4 text-primary" />
              <h4 className="text-xl font-bold text-tomato-brown mb-2">Самовывоз</h4>
              <p className="text-gray-600 mb-4">Забирайте заказы прямо с фермы</p>
              <div className="text-lg font-semibold text-primary">Бесплатно</div>
            </Card>

            <Card className="text-center p-6">
              <Icon name="MapPin" size={48} className="mx-auto mb-4 text-primary" />
              <h4 className="text-xl font-bold text-tomato-brown mb-2">По России</h4>
              <p className="text-gray-600 mb-4">Отправляем транспортными компаниями</p>
              <div className="text-lg font-semibold text-primary">По тарифам ТК</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-tomato-brown mb-4">Отзывы</h3>
            <p className="text-gray-600">Что говорят наши покупатели</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  М
                </div>
                <div className="ml-3">
                  <h4 className="font-bold text-tomato-brown">Мария Петрова</h4>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                "Отличные помидоры! Покупаю уже второй сезон. Очень вкусные, 
                ароматные и действительно свежие. Доставка быстрая."
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  А
                </div>
                <div className="ml-3">
                  <h4 className="font-bold text-tomato-brown">Алексей Иванов</h4>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                "Заказываю для ресторана. Качество всегда на высоте, 
                помидоры приходят в отличном состоянии. Рекомендую!"
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  Е
                </div>
                <div className="ml-3">
                  <h4 className="font-bold text-tomato-brown">Елена Смирнова</h4>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(4)}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                "Люблю черри томаты отсюда! Дети едят как конфеты. 
                Видно, что выращены с любовью и без химии."
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 bg-tomato-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-tomato-brown mb-4">Контакты</h3>
            <p className="text-gray-600">Свяжитесь с нами любым удобным способом</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Icon name="MapPin" size={24} className="text-primary" />
                <div>
                  <h4 className="font-bold text-tomato-brown">Адрес фермы</h4>
                  <p className="text-gray-700">Московская область, Подольский район, д. Красная Горка</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Icon name="Phone" size={24} className="text-primary" />
                <div>
                  <h4 className="font-bold text-tomato-brown">Телефон</h4>
                  <p className="text-gray-700">+7 (495) 123-45-67</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Icon name="Mail" size={24} className="text-primary" />
                <div>
                  <h4 className="font-bold text-tomato-brown">Email</h4>
                  <p className="text-gray-700">info@krasnysad.ru</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Icon name="Clock" size={24} className="text-primary" />
                <div>
                  <h4 className="font-bold text-tomato-brown">Режим работы</h4>
                  <p className="text-gray-700">Пн-Вс: 8:00 - 20:00</p>
                </div>
              </div>
            </div>

            <Card className="p-6">
              <h4 className="text-xl font-bold text-tomato-brown mb-4">Напишите нам</h4>
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Ваше имя" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <textarea 
                  rows={4}
                  placeholder="Ваше сообщение" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Отправить сообщение
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-tomato-brown text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                🍅
              </div>
              <div>
                <h4 className="font-bold">Ферма "Красный сад"</h4>
                <p className="text-sm opacity-80">Свежие помидоры с любовью</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm opacity-80">
                © 2024 Ферма "Красный сад". Все права защищены.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;